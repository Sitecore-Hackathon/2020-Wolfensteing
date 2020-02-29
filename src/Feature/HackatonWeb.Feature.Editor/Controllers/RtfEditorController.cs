using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.Editor.Controllers
{
    public class RtfEditorController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/RtfEditor.cshtml", CreateModel());
        }

        private Models.RtfEditor CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var rtfEditor = new Models.RtfEditor()
            {                
                Content = new HtmlString(FieldRenderer.Render(item, "Content")),
            };

            return rtfEditor;
        }
    }
}