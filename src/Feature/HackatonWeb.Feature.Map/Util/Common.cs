
using HackatonWeb.Feature.Map.Models;
using Sitecore.Data.Items;
using Sitecore.Web.UI.WebControls;
using System.Collections.Generic;
using System.Web;

namespace HackatonWeb.Feature.Map
{
    public static class Common
    {
        public static List<Team> GetTeams(Item item)
        {
            var teamItems = item.Axes.GetDescendants();
            var teams = new List<Team>();

            foreach (var teamItem in teamItems)
            {
                teams.Add(new Team
                {
                    Country = GetCountry(teamItem),
                    TeamName = new HtmlString(FieldRenderer.Render(teamItem, "TeamName")),
                    TeamMates = GetTeamMates(teamItem)
                });
            }

            return teams;
        }

        public static List<Mate> GetTeamMates(Item item)
        {
            var teamMateItems = item.Axes.GetDescendants();
            var teamMates = new List<Mate>();

            foreach (var teamMateItem in teamMateItems)
            {
                teamMates.Add(new Mate
                {
                    FullName = new HtmlString(FieldRenderer.Render(teamMateItem, "FullName")),
                    LinkedIn = teamMateItem.Fields["LinkedIn"].Value,
                    Twitter = teamMateItem.Fields["Twitter"].Value,
                });
            }

            return teamMates;
        }

        public static Country GetCountry(Item item)
        {
            var countryItem = Sitecore.Context.Database.GetItem(item.Fields["Country"].ID);
            var country = new Country
            {
                CountryKey = countryItem.Fields["CountryKey"].Value,
                CountryName = countryItem.Fields["CountryName"].Value,
                CountryLatitude = double.Parse(countryItem.Fields["CountryLatitude"].Value),
                CountryLongitude = double.Parse(countryItem.Fields["CountryLongitude"].Value),
                CountryInfo = countryItem.Fields["CountryInfo"].Value,
            };

            return country;
        }
    }
}