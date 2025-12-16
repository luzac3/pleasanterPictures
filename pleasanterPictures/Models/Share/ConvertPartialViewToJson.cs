using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc;

namespace offlineMeeting.Models.Share
{
    public class ConvertPartialViewToJson
    {
        public string convert(
            ICompositeViewEngine ViewEngine,
            ActionContext Context,
            string viewName,
            PartialViewResult partialViewResult
        )
        {
            using (var stringWriter = new StringWriter())
            {
                ViewEngineResult viewEngineResult = ViewEngine.FindView(Context, viewName, false);

                if (viewEngineResult.View == null)
                {
                    throw new ArgumentNullException("invalid view name");
                }

                ViewContext viewContext = new ViewContext(
                    Context,
                    viewEngineResult.View,
                    partialViewResult.ViewData,
                    partialViewResult.TempData,
                    stringWriter,
                    new HtmlHelperOptions()
                );

                viewEngineResult.View.RenderAsync(viewContext);

                return stringWriter.GetStringBuilder().ToString(); ;
            }
        }
    }
}
