using System;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class ResetPasswordDto
    {
        public Guid ForgotPasswordKey { get; set; }
        public string Password { get; set; }
    }
}
