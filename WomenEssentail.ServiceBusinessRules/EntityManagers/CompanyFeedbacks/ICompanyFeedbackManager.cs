using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyFeedbacks
{
    public interface ICompanyFeedbackManager 
	{
        Result<CompanyFeedbackDto> GetCompanyFeedbacks(CompanyFeedbackSearchFilter companyFeedbackSearchFilter);
        Response<CompanyFeedbackDto> Save(CompanyFeedbackDto companyFeedbackDto);
    }
}

