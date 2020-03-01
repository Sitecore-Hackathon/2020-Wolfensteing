using HackatonWeb.WebSite.Models;
using Sitecore.Collections;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace HackatonWeb.WebSite.Controllers
{
    public class HeaderContentController : Controller
    {
        // GET: Default
        public ActionResult Index()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var model = new HeaderContentModel
            {
                Logo = new HtmlString(FieldRenderer.Render(item, "Logo")),
                Description = item.Fields["Description"].Value
            };

            return View("~/Views/Content/HeaderContent.cshtml", model);
        }

        public ActionResult MenuNavigation()
        {
            var dataSourceId = RenderingContext.CurrentOrNull.Rendering.DataSource;
            var item = Sitecore.Context.Database.GetItem(dataSourceId);

            var menuIems = item.Children;

            var menus = new List<NavigationMenu>();

            foreach (var menuItem in menuIems)
            {
                var navItem = (Item)menuItem;
                var model = new NavigationMenu
                {
                    MenuId = navItem.ID.ToString(),
                    Title = navItem.Fields["MenuName"].Value,
                    MenuLink = new HtmlString(FieldRenderer.Render(navItem, "MenuLink"))
                };

                if (navItem.Children?.Count > 0)
                {
                    model.SubMenus = GetChildMenus(navItem.Children);
                }

                menus.Add(model);
            }

            return View("~/Views/Content/NavigationMenu.cshtml", menus);
        }

        private List<NavigationMenu> GetChildMenus(ChildList childs)
        {
            var menus = new List<NavigationMenu>();
            foreach (var menuItem in childs)
            {
                var navItem = (Item)menuItem;
                var model = new NavigationMenu
                {
                    MenuId = navItem.ID.ToString(),
                    Title = navItem.Fields["MenuName"].Value,
                    MenuLink = new HtmlString(FieldRenderer.Render(navItem, "MenuLink"))
                };

                if (navItem.Children?.Count > 0)
                {
                    model.SubMenus = GetChildMenus(navItem.Children);
                }

                menus.Add(model);
            }
            return menus;
        }
    }
}