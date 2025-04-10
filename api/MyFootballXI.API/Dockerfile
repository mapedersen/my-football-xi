FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyFootballXI.API/MyFootballXI.API.csproj", "MyFootballXI.API/"]
COPY ["MyFootballXI.Infra/MyFootballXI.Infra.csproj", "MyFootballXI.Infra/"]
RUN dotnet restore "MyFootballXI.API/MyFootballXI.API.csproj"
COPY . .
WORKDIR "/src/MyFootballXI.API"
RUN dotnet build "MyFootballXI.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyFootballXI.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyFootballXI.API.dll"]
