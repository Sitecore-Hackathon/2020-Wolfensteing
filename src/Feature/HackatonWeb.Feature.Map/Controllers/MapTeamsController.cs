using HackatonWeb.Feature.Map.Models;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.Map.Controllers
{
    public class MapTeamsController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/MapTeams.cshtml", CreateModel());
        }

        private MapTeams CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var mapTeams = new MapTeams()
            {
                Title = new HtmlString(FieldRenderer.Render(item, "Title")),
            };

            return mapTeams;
        }
    }
}