using System.Web;

namespace HackatonWeb.Feature.Map.Models
{
    public class Team
    {
        public string CountryKey { get; set; }

        public HtmlString CountryName { get; set; }

        public string HashTag { get; set; }
    }
}