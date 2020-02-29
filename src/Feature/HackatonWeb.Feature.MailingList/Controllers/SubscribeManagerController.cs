using Newtonsoft.Json;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;

namespace HackatonWeb.Feature.MailingList.Controllers
{
    public class SubscribeManagerController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get(string email)
        {
            var result = new
            {
                Message = $"You have been subscribe to this mailing list using the email: {email}",
                Success = true
            };
            return new JsonResult<dynamic>(result, new JsonSerializerSettings(), Encoding.UTF8, this);
        }
    }
}