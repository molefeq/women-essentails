using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.ContactUss
{
	public interface IContactUsManager 
	{
        Response<ContactUsDto> Save(ContactUsDto contactUsDto);

    }
}

