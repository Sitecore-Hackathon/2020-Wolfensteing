using HackatonWeb.Feature.Map.Models;
using Sitecore.Data.Fields;
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
            var teamChildren = item.Children;
            var teams = new List<Team>();

            foreach (var teamChild in teamChildren.InnerChildren)
            {
                var teamItem = Sitecore.Context.Database.GetItem(teamChild.ID);
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
            ReferenceField field = item?.Fields["Country"];
            if (field == null)
            {
                return new Country();
            }

            var countryItem = Sitecore.Context.Database.GetItem($"/sitecore/{field.InnerField.Source}/{field.Path}");
            // var countryItem = Sitecore.Context.Database.GetItem(field.TargetItem.ID); // Target Item is null ???
            if (countryItem == null)
            {
                return new Country();
            }

            var country = new Country
            {
                CountryCode = countryItem.Fields["CountryCode"].Value,
                CountryName = countryItem.Fields["CountryName"].Value,
                CountryLatitude = double.Parse(countryItem.Fields["CountryLatitude"].Value),
                CountryLongitude = double.Parse(countryItem.Fields["CountryLongitude"].Value),
                CountryInfo = countryItem.Fields["CountryInfo"].Value,
            };

            return country;
        }
    }
}