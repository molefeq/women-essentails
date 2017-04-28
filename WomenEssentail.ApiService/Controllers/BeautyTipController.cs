using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using System.Net;
using System.Net.Http;
using System.Web.Http;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.BeautyTips;
using WomenEssentail.ServiceBusinessRules.Filters;
using WomenEssentail.ServiceBusinessRules.Providers;

namespace WomenEssentail.ApiService.Controllers
{
    public class BeautyTipController : BaseApiController
    {
        private readonly IBeautyTipManager beautyTipManager;

        public BeautyTipController(IBeautyTipManager beautyTipManager)
        {
            this.beautyTipManager = beautyTipManager;
        }

        [HttpPost]
        public HttpResponseMessage GetBeautyTips(BeautyTipSearchFilter beautyTipSearchFilter)
        {
            Result<BeautyTipDto> result = beautyTipManager.GetBeautyTips(beautyTipSearchFilter);

            return Request.CreateResponse<Result<BeautyTipDto>>(HttpStatusCode.OK, result);
        }

        [SecurityFilter()]
        [HttpPost]
        public HttpResponseMessage AddBeautyTip(BeautyTipDto beautyTipDto)
        {
            beautyTipDto.CrudStatus = CrudStatus.CREATE;

            return SaveBeautyTip(beautyTipDto);
        }

        [SecurityFilter()]
        [HttpPost]
        public HttpResponseMessage UpdateBeautyTip(BeautyTipDto beautyTipDto)
        {
            beautyTipDto.CrudStatus = CrudStatus.UPDATE;

            return SaveBeautyTip(beautyTipDto);
        }

        [SecurityFilter()]
        [HttpPost]
        public HttpResponseMessage DeleteBeautyTip(BeautyTipDto beautyTipDto)
        {
            beautyTipDto.CrudStatus = CrudStatus.DELETE;

            return SaveBeautyTip(beautyTipDto);
        }

        [HttpPost]
        public HttpResponseMessage ActivateBeautyTip(BeautyTipDto beautyTipDto)
        {
            beautyTipDto.CrudStatus = CrudStatus.UPDATE;
            beautyTipDto.EditUserId = UserId;

            Response<BeautyTipDto> response = beautyTipManager.Activate(beautyTipDto);

            return Request.CreateResponse<Response<BeautyTipDto>>(HttpStatusCode.OK, response);
        }
        [HttpPost]
        public HttpResponseMessage FetchBeautyTip(int beautyTipId)
        {
            BeautyTipDto beautyTipDto = new BeautyTipDto { CrudStatus = CrudStatus.READ, Id = beautyTipId };

            return SaveBeautyTip(beautyTipDto);
        }

        #region Private Methods

        private HttpResponseMessage SaveBeautyTip(BeautyTipDto beautyTipDto)
        {
            beautyTipDto.EditUserId = UserId;
            Response<BeautyTipDto> response = beautyTipManager.Save(beautyTipDto);

            return Request.CreateResponse<Response<BeautyTipDto>>(HttpStatusCode.OK, response);
        }

        #endregion
    }
}
