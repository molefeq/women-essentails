using System.Collections.Generic;

namespace WomenEssentail.Common.DataHelper
{
    public class BulkUpdateModel
    {
        public List<int> Ids { get; set; }
        public string StatusCode { get; set; }
        public int EditUserId { get; set; }
    }
}
