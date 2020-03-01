using System.Collections.Generic;
using System.Web;

namespace HackatonWeb.WebSite.Models
{
    public class NavigationMenu
    {
        public string MenuId { get; set; }
        public string Title { get; set; }

        public HtmlString MenuLink { get; set; }

        public List<NavigationMenu> SubMenus { get; set; }

        public NavigationMenu()
        {
            SubMenus = new List<NavigationMenu>();
        }
    }
}