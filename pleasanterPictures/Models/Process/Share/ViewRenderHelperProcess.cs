using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

public class ViewRenderHelperProcess
{
    private readonly ICompositeViewEngine _viewEngine;
    private readonly ITempDataProvider _tempDataProvider;
    private readonly IServiceProvider _serviceProvider;

    public ViewRenderHelperProcess(
        ICompositeViewEngine viewEngine,
        ITempDataProvider tempDataProvider,
        IServiceProvider serviceProvider)
    {
        _viewEngine = viewEngine;
        _tempDataProvider = tempDataProvider;
        _serviceProvider = serviceProvider;
    }

    public async Task<string> RenderToStringAsync(Controller controller, string viewName, object model)
    {
        controller.ViewData.Model = model;
        using var sw = new StringWriter();
        var actionContext = new ActionContext(controller.HttpContext, controller.RouteData, controller.ControllerContext.ActionDescriptor);
        var viewResult = _viewEngine.FindView(actionContext, viewName, false);

        if (viewResult.View == null)
            throw new ArgumentNullException($"{viewName} not found.");

        var viewContext = new ViewContext(
            actionContext,
            viewResult.View,
            controller.ViewData,
            controller.TempData,
            sw,
            new HtmlHelperOptions()
        );

        await viewResult.View.RenderAsync(viewContext);
        return sw.ToString();
    }
}