using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.LookupFields
{
    public interface ILookupFieldManager
    {
        Response<LookupFieldDto> GetLookupFields(int? lookFieldId, string fieldName);
    }
}
