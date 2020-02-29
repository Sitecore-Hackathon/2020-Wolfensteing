using System.Collections.Generic;
using System.Web;

namespace HackatonWeb.Feature.Map.Models
{
    public class MapTeams
    {
        public HtmlString Title { get; set; }

        public string Close { get; set; }

        public List<Team> Teams { get; set; }
    }
}