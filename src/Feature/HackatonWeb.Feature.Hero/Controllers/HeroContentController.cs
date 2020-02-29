using HackatonWeb.Feature.Hero.Models;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.Feature.Hero.Controllers
{
    public class HeroContentController : Controller
    {
        public ActionResult Index()
        {
            return View(CreateModel());
        }

        private static HeroContent CreateModel()
        {
            var item = RenderingContext.Current.ContextItem;
            var heroContent = new HeroContent()
            {
                Title = new HtmlString(FieldRenderer.Render(item, "Title")),
                SubTitle = new HtmlString(FieldRenderer.Render(item, "SubTitle")),
                Description = new HtmlString(FieldRenderer.Render(item, "Description")),
                LabelMoreInformation = new HtmlString(FieldRenderer.Render(item, "LabelMoreInformation")),
                LabelJoin = new HtmlString(FieldRenderer.Render(item, "LabelJoin")),
                LinkMoreInformation = new HtmlString(FieldRenderer.Render(item, "LinkMoreInformation")),
                LinkJoin = new HtmlString(FieldRenderer.Render(item, "LinkJoin")),
                BackgroundImage = new HtmlString(FieldRenderer.Render(item, "BackgroundImage")),
                VideoUrl = new HtmlString(FieldRenderer.Render(item, "VideoUrl"))
            };

            return heroContent;
        }
    }
}