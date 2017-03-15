using Libraries.Common.Extensions;

using System;
using System.Configuration;

namespace WomenEssentail.ServiceBusinessRules.Utilities
{
    public class AppSettingsUtils
    {
        public static string GetStringAppSetting(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        public static int GetIntegerAppSetting(string key)
        {
            string appSettingValue = GetStringAppSetting(key);

            if (string.IsNullOrEmpty(appSettingValue))
            {
                return int.MinValue;
            }

            return appSettingValue.ToInteger();
        }

        public static int GetDimensionWidth(string key)
        {
            string appSettingValue = GetStringAppSetting(key);

            if (string.IsNullOrEmpty(appSettingValue))
            {
                return int.MinValue;
            }

            string widthValue = appSettingValue.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries)[0];

            if (string.IsNullOrEmpty(widthValue))
            {
                return int.MinValue;
            }

            return widthValue.ToInteger();
        }

        public static int GetDimensionHeight(string key)
        {
            string appSettingValue = GetStringAppSetting(key);

            if (string.IsNullOrEmpty(appSettingValue))
            {
                return int.MinValue;
            }

            string heightValue = appSettingValue.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries)[1];

            if (string.IsNullOrEmpty(heightValue))
            {
                return int.MinValue;
            }

            return heightValue.ToInteger();
        }

        public static string GetAppSettingUri(Uri currentUrl, string key, Func<string, string> virtualPathFunction)
        {
            string appSettingValue = GetStringAppSetting(key);

            return new Uri(currentUrl, virtualPathFunction(appSettingValue)).AbsoluteUri;
        }

        public static string GetAppSettingPhysicalPath(string key, Func<string, string> serverMapPathFunction)
        {
            string appSettingValue = GetStringAppSetting(key);

            return serverMapPathFunction(appSettingValue);
        }
    }
}
