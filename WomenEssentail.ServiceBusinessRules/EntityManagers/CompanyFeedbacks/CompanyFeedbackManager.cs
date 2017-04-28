using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyFeedbacks.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyFeedbacks
{
    public class CompanyFeedbackManager : ICompanyFeedbackManager
    {
        public Result<CompanyFeedbackDto> GetCompanyFeedbacks(CompanyFeedbackSearchFilter companyFeedbackSearchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanyFeedbacks.Get(companyFeedbackSearchFilter, CompanyFeedbackMappers.Instance.MapToCompanyFeedbackDto);
            }
        }

        public Response<CompanyFeedbackDto> Save(CompanyFeedbackDto companyFeedbackDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanyFeedbacks.Save(companyFeedbackDto, CompanyFeedbackMappers.Instance.MapToCompanyFeedbackDto);
            }
        }
    }
}

