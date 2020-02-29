using System.Web;

namespace HackatonWeb.Feature.Map.Models
{
    public class Country
    {
        public string CountryKey { get; set; }

        public string CountryName { get; set; }

        public double CountryLatitude { get; set; }

        public double CountryLongitude { get; set; }

        public string CountryInfo { get; set; }
    }
}