using System.Collections.Generic;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.Common.DataHelper
{
    public class CompanyDataObject
    {
        public CompanyTypeDto CompanyType { get; set; }
        public List<CategoryDto> Categories { get; set; }
    }
}
