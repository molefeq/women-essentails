using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.BeautyTips
{
    public interface IBeautyTipManager
    {
        Result<BeautyTipDto> GetBeautyTips(BeautyTipSearchFilter beautyTipSearchFilter);
        Response<BeautyTipDto> Activate(BeautyTipDto beautyTipDto);
        Response<BeautyTipDto> Save(BeautyTipDto beautyTipDto);
    }
}

