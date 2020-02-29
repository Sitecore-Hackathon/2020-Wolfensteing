using System.Collections.Generic;
using System.Web;

namespace HackatonWeb.Feature.Map.Models
{
    public class Team
    {
        public Country Country { get; set; }

        public HtmlString TeamName { get; set; }

        public List<Mate> TeamMates { get; set; }
    }
}