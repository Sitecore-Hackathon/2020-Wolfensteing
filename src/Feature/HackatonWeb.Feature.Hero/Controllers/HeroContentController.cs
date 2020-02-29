using HackatonWeb.Feature.Hero.Models;
using HackatonWeb.Foundation.Util;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.Hero.Controllers
{
    public class HeroContentController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/HeroContent.cshtml",CreateModel());
        }

        private HeroContent CreateModel()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var heroContent = new HeroContent()
            {
                Title = new HtmlString(FieldRenderer.Render(item, "Title")),
                SubTitle = new HtmlString(FieldRenderer.Render(item, "SubTitle")),
                Description = new HtmlString(FieldRenderer.Render(item, "Description")),
                LinkMoreInformation = new HtmlString(FieldRenderer.Render(item, "LinkMoreInformation")),
                LinkJoin = new HtmlString(FieldRenderer.Render(item, "LinkJoin")),
                BackgroundImage = new HtmlString(FieldRenderer.Render(item, "BackgroundImage")),
                VideoUrl = LinkUtil.GetUrlFromLinkField(item.Fields["VideoUrl"])
            };

            return heroContent;
        }  
    }
}