package com.eduideal.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.BufferedReader;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class EduidealApplication {

    public static void main(String[] args) {
        loadDotEnv();
        SpringApplication.run(EduidealApplication.class, args);
    }

    /**
     * Automatically reads and populates environment variables from .env if present.
     * Looks in current directory, parent directory, and backend subdirectory.
     * Also converts Railway's standard DATABASE_URL (postgresql://user:pass@host:port/db)
     * into Spring's JDBC format (jdbc:postgresql://host:port/db) and extracts username/password.
     */
    private static void loadDotEnv() {
        Path[] searchPaths = {
            Paths.get(".env"),
            Paths.get("..", ".env"),
            Paths.get("backend", ".env")
        };

        for (Path path : searchPaths) {
            if (Files.exists(path) && Files.isRegularFile(path)) {
                try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#")) {
                            continue;
                        }
                        int eqIndex = line.indexOf('=');
                        if (eqIndex > 0) {
                            String key = line.substring(0, eqIndex).trim();
                            String value = line.substring(eqIndex + 1).trim();
                            if ((value.startsWith("\"") && value.endsWith("\"")) ||
                                (value.startsWith("'") && value.endsWith("'"))) {
                                value = value.substring(1, value.length() - 1);
                            }
                            if (System.getProperty(key) == null && System.getenv(key) == null) {
                                System.setProperty(key, value);
                            }
                        }
                    }
                    System.out.println(">>> [.env] Loaded environment configurations from: " + path.toAbsolutePath());
                    break;
                } catch (Exception e) {
                    System.err.println(">>> [.env] Warning: Could not parse " + path + ": " + e.getMessage());
                }
            }
        }

        // Bridge DATABASE_URL into SPRING_DATASOURCE_URL and credentials if needed
        String datasourceUrl = System.getProperty("SPRING_DATASOURCE_URL");
        if (datasourceUrl == null) {
            datasourceUrl = System.getenv("SPRING_DATASOURCE_URL");
        }

        if (datasourceUrl == null) {
            String dbUrl = System.getProperty("DATABASE_URL");
            if (dbUrl == null) {
                dbUrl = System.getenv("DATABASE_URL");
            }

            if (dbUrl != null && !dbUrl.isEmpty()) {
                try {
                    String cleanUrl = dbUrl;
                    if (cleanUrl.startsWith("jdbc:")) {
                        System.setProperty("SPRING_DATASOURCE_URL", cleanUrl);
                    } else {
                        if (cleanUrl.startsWith("postgres://")) {
                            cleanUrl = "postgresql://" + cleanUrl.substring("postgres://".length());
                        }
                        URI uri = URI.create(cleanUrl);
                        String host = uri.getHost();
                        int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                        String dbName = (uri.getPath() != null && uri.getPath().length() > 1)
                                ? uri.getPath().substring(1)
                                : "railway";

                        String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + "/" + dbName;
                        System.setProperty("SPRING_DATASOURCE_URL", jdbcUrl);

                        String userInfo = uri.getUserInfo();
                        if (userInfo != null && userInfo.contains(":")) {
                            String[] parts = userInfo.split(":", 2);
                            if (System.getProperty("DB_USERNAME") == null && System.getenv("DB_USERNAME") == null) {
                                System.setProperty("DB_USERNAME", parts[0]);
                            }
                            if (System.getProperty("DB_PASSWORD") == null && System.getenv("DB_PASSWORD") == null) {
                                System.setProperty("DB_PASSWORD", parts[1]);
                            }
                        }
                    }
                } catch (Exception e) {
                    System.err.println(">>> [Database URL Adapter] Could not parse DATABASE_URL: " + e.getMessage());
                }
            }
        }
    }
}
