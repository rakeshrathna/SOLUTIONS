# Stage 1: Build the Maven application
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper and POM first to leverage layer caching
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy source code and build the JAR artifact
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal Runtime Image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy compiled JAR from build stage
COPY --from=build /app/target/portal-0.0.1-SNAPSHOT.jar app.jar

# Expose port (Render automatically injects PORT env variable)
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
