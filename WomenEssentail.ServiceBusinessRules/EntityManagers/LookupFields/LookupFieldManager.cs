using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.LookupFields.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.LookupFields
{
    public class LookupFieldManager : ILookupFieldManager
    {
        public Response<LookupFieldDto> GetLookupFields(int? lookFieldId, string fieldName)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.LookupFields.LookupFieldsFetch(lookFieldId, fieldName, LookupFieldMappers.Instance.MapLookupFieldsFetchQuery);
            }
        }
    }
}
