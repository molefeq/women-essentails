using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories
{
    public class SubCategoryManager: ISubCategoryManager
    {
        public Result<SubCategoryDto> GetSubCategories(SubCategorySearchFilter subCategorySearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.SubCategories.Get(subCategorySearchFilter, SubCategoryMappers.Instance.MapToSubCategoryDto);
            }
        }
    }
}
