using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using offlineMeeting.Models.Entity.Login;
using offlineMeeting.Models.Entity.Share;
using offlineMeeting.Models.JsonDataProperty;
using PleasanterBridge.src.Configuration;
using PleasanterBridge.src.APIBridge.Configuration;

var builder = WebApplication.CreateBuilder(args);

var provider = new FileExtensionContentTypeProvider();

// AddSignalR to the container.
builder.Services.AddSignalR();

// Add services to the container.
builder.Services.AddControllersWithViews();

// PleasanterSettings を JSON ファイルからロード
var pleasanterSettingsProperty = new PleasanterSettingsProperty(builder.Environment.ContentRootPath);
var settings = new PleasanterSettings(
    apiKey: pleasanterSettingsProperty.ApiKey ?? throw new InvalidOperationException("ApiKey is required"),
    url: pleasanterSettingsProperty.Url ?? throw new InvalidOperationException("Url is required"),
    server: pleasanterSettingsProperty.Server ?? throw new InvalidOperationException("Server is required"),
    database: pleasanterSettingsProperty.Database ?? throw new InvalidOperationException("Database is required"),
    userId: pleasanterSettingsProperty.UserId ?? throw new InvalidOperationException("UserId is required"),
    password: pleasanterSettingsProperty.Password ?? throw new InvalidOperationException("Password is required")
);

// PleasanterBridge を DI コンテナに登録
builder.Services.AddPleasanterBridge(settings);

var app = builder.Build();

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider,
    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.WebRootPath)),

});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

EnvironmentEntity.ContentRootPath = Environment.CurrentDirectory;

app.UseDefaultFiles();
app.UseHttpsRedirection();

app.MapHub<MyHub>("/hub");
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Picture}/{action=Index}/{id?}");

app.Run();
