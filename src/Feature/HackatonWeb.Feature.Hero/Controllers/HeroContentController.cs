using HackatonWeb.Feature.Hero.Models;
using Sitecore.Data.Fields;
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
                VideoUrl = LinkUrl(item.Fields["VideoUrl"])
            };

            return heroContent;
        }

        private string LinkUrl(LinkField lf)
        {
            switch (lf.LinkType.ToLower())
            {
                case "internal":
                    // Use LinkMananger for internal links, if link is not empty
                    return lf.TargetItem != null ? Sitecore.Links.LinkManager.GetItemUrl(lf.TargetItem) : string.Empty;
                case "media":
                    // Use MediaManager for media links, if link is not empty
                    return lf.TargetItem != null ? Sitecore.Resources.Media.MediaManager.GetMediaUrl(lf.TargetItem) : string.Empty;
                case "external":
                    // Just return external links
                    return lf.Url;
                case "anchor":
                    // Prefix anchor link with # if link if not empty
                    return !string.IsNullOrEmpty(lf.Anchor) ? "#" + lf.Anchor : string.Empty;
                case "mailto":
                    // Just return mailto link
                    return lf.Url;
                case "javascript":
                    // Just return javascript
                    return lf.Url;
                default:
                    // Just please the compiler, this
                    // condition will never be met
                    return lf.Url;
            }
        }
    }
}