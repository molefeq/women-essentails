using Libraries.Common.Enums;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class ContactUsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string Number { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public CrudStatus CrudStatus { get; set; }
    }
}
