using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories
{
    public interface ISubCategoryManager
    {
        Result<SubCategoryDto> GetSubCategories(SubCategorySearchFilter subCategorySearchFilter);

        Response<SubCategoryDto> Save(SubCategoryDto subCategoryDto);
    }
}