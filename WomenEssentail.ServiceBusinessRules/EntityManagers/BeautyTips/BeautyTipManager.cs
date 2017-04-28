using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.BeautyTips.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.BeautyTips
{
	public class BeautyTipManager : IBeautyTipManager
    {
        public Result<BeautyTipDto> GetBeautyTips(BeautyTipSearchFilter beautyTipSearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.BeautyTips.Get(beautyTipSearchFilter, BeautyTipMappers.Instance.MapFromGetBeautyTips);
            }
        }

        public Response<BeautyTipDto> Activate(BeautyTipDto beautyTipDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.BeautyTips.Activate(beautyTipDto, BeautyTipMappers.Instance.MapToBeautyTipDto);
            }
        }

        public Response<BeautyTipDto> Save(BeautyTipDto beautyTipDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.BeautyTips.Save(beautyTipDto, BeautyTipMappers.Instance.MapToBeautyTipDto);
            }
        }
    }
}

