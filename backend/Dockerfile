# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["Gateway/Gateway.csproj", "Gateway/"]
COPY ["AuthAPI/AuthAPI.csproj", "AuthAPI/"]
COPY ["UserAPI/UserAPI.csproj", "UserAPI/"]
COPY ["ProductAndCategoryAPI/ProductAndCategoryAPI.csproj", "ProductAndCategoryAPI/"]
COPY ["CartAPI/CartAPI.csproj", "CartAPI/"]
COPY ["OrderAPI/OrderAPI.csproj", "OrderAPI/"]
COPY ["FeedbackAPI/FeedbackAPI.csproj", "FeedbackAPI/"]
COPY ["NotificationAPI/NotificationAPI.csproj", "NotificationAPI/"]
COPY ["SharedDTOs/SharedDTOs.csproj", "SharedDTOs/"]
COPY ["SharedServices/SharedServices.csproj", "SharedServices/"]

# Restore
RUN dotnet restore "Gateway/Gateway.csproj"
RUN dotnet restore "AuthAPI/AuthAPI.csproj"
RUN dotnet restore "UserAPI/UserAPI.csproj"
RUN dotnet restore "ProductAndCategoryAPI/ProductAndCategoryAPI.csproj"
RUN dotnet restore "CartAPI/CartAPI.csproj"
RUN dotnet restore "OrderAPI/OrderAPI.csproj"
RUN dotnet restore "FeedbackAPI/FeedbackAPI.csproj"
RUN dotnet restore "NotificationAPI/NotificationAPI.csproj"
RUN dotnet restore "SharedDTOs/SharedDTOs.csproj"
RUN dotnet restore "SharedServices/SharedServices.csproj"

# Copy all source files
COPY . .

# Build
RUN dotnet build -c Release -o /app/build

# Publish stage for Gateway
FROM build AS publish-gateway
RUN dotnet publish "Gateway/Gateway.csproj" -c Release -o /app/publish-gateway

# Publish stage for AuthAPI
FROM build AS publish-auth
RUN dotnet publish "AuthAPI/AuthAPI.csproj" -c Release -o /app/publish-auth

# Publish stage for UserAPI
FROM build AS publish-user
RUN dotnet publish "UserAPI/UserAPI.csproj" -c Release -o /app/publish-user

# Publish stage for ProductAndCategoryAPI
FROM build AS publish-product
RUN dotnet publish "ProductAndCategoryAPI/ProductAndCategoryAPI.csproj" -c Release -o /app/publish-product

# Publish stage for CartAPI
FROM build AS publish-cart
RUN dotnet publish "CartAPI/CartAPI.csproj" -c Release -o /app/publish-cart

# Publish stage for OrderAPI
FROM build AS publish-order
RUN dotnet publish "OrderAPI/OrderAPI.csproj" -c Release -o /app/publish-order

# Publish stage for FeedbackAPI
FROM build AS publish-feedback
RUN dotnet publish "FeedbackAPI/FeedbackAPI.csproj" -c Release -o /app/publish-feedback

# Publish stage for NotificationAPI
FROM build AS publish-notification
RUN dotnet publish "NotificationAPI/NotificationAPI.csproj" -c Release -o /app/publish-notification

# Final runtime stage - This dockerfile would be used to build individual service images
# For production, create specific Dockerfiles for each service or use docker-compose

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080

# Default to running the Gateway
# Override this when running specific services
COPY --from=publish-gateway /app/publish-gateway .
ENTRYPOINT ["dotnet", "Gateway.dll"]



