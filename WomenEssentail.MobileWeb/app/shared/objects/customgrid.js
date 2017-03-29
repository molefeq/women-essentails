
var app = app || {};

(function (customgrid) {
    var _ReadCallBack = function (options) { };
    var _PagesOffet = 5;

    // Class properties

    customgrid.Columns = [];
    customgrid.SubColumns = [];
    customgrid.IsHierachyGrd = false;

    customgrid.Paging = {
        IsFirstPage: false,
        IsLastPage: false,
        TotalPages: 0,
        Pages: [],
        PageIndex: 0,
        PageSize: 10,
        CurrentItemsCount: 10
    };

    customgrid.PageSizes = [];
    customgrid.DataSource = {};
    customgrid.SubItemsField = '';
    customgrid.ExpandMode = 'Collapse';

    // Class methods

    customgrid.DisplayItemExpand = function (dataItem) {
        return dataItem[customgrid.SubItemsField] && dataItem[customgrid.SubItemsField].length;
    };

    customgrid.ExpandIconClass = function () {
        return customgrid.ExpandMode.toLowerCase() == 'expand' ? 'opened' : 'closed'
    };

    customgrid.ExpandRowClass = function () {
        return customgrid.ExpandMode.toLowerCase() == 'expand' ? 'expandRow' : 'closeRow'
    };

    customgrid.SetPage = function (e, pageIndex) {
        if (e) {
            e.preventDefault();
        }

        customgrid.Paging.PageIndex = pageIndex;
        customgrid.Read();
    };

    customgrid.Read = function (read_callback) {
        var take = customgrid.Paging.PageSize;
        var skip = customgrid.Paging.PageSize * (customgrid.Paging.PageIndex - 1);

        window.scrollTo(0, 0);

        if (read_callback) {
            _ReadCallBack = read_callback;
        }

        _ReadCallBack({ take: take, skip: skip });
    };

    customgrid.PageSizeChange = function (e) {
        customgrid.Paging.PageIndex = 1;
        customgrid.Read();
    };

    customgrid.isNormalColumn = function (column) {
        return !column.Filter && !column.TemplateId;
    };

    customgrid.isFormatColumn = function (column) {
        return column.Filter && column.Filter.Format && !column.TemplateId;
    };

    customgrid.isTemplateColumn = function (column) {
        return column.TemplateId;
    };

    customgrid.isNormalHeader = function (column) {
        return !column.HeaderTemplateId;
    };

    customgrid.isTemplateHeader = function (column) {
        return column.HeaderTemplateId;
    };

    customgrid.setOptions = function (options) {
        if (options.PageSizes) {
            customgrid.PageSizes = options.PageSizes;
        }

        if (options.Columns) {
            customgrid.Columns = options.Columns;
        }

        if (options.SubColumns) {
            customgrid.SubColumns = options.SubColumns;
        }

        if (options.Paging) {
            customgrid.Paging = options.Paging;
        }

        if (options.Read) {
            _ReadCallBack = options.Read;
        }

        if (options.SubItemsField) {
            customgrid.SubItemsField = options.SubItemsField;
        }

        if (options.ExpandMode) {
            customgrid.ExpandMode = options.ExpandMode;
        }

        if (options.IsHierachyGrd) {
            customgrid.IsHierachyGrd = options.IsHierachyGrd;
        }
    };

    customgrid.SetDataSource = function (data, totalItems) {
        customgrid.DataSource = {
            Data: data,
            Total: totalItems
        };

        customgrid.SetPages(totalItems);
    };

    customgrid.SetPages = function (totalItems) {
        customgrid.Paging.IsLastPage = false;
        customgrid.Paging.Pages = [];
        customgrid.Paging.TotalPages = Math.ceil(totalItems / customgrid.Paging.PageSize);

        var pageInterval = Math.floor(customgrid.Paging.PageIndex / _PagesOffet);
        var startPageIndex = pageInterval == 0 ? 1 : pageInterval * _PagesOffet;
        var lastPageIndex = pageInterval == 0 ? _PagesOffet : startPageIndex + (_PagesOffet - 1);
        var currentItemsCount = customgrid.Paging.PageIndex * customgrid.Paging.PageSize;

        if (lastPageIndex >= customgrid.Paging.TotalPages) {
            lastPageIndex = customgrid.Paging.TotalPages;
            startPageIndex = startPageIndex == 1 || lastPageIndex - _PagesOffet < 1 ? 1 : lastPageIndex - _PagesOffet;
        }

        for (var i = startPageIndex; i <= lastPageIndex; i++) {
            customgrid.Paging.Pages.push(i);
        }

        customgrid.Paging.IsFirstPage = customgrid.Paging.PageIndex === 1;
        customgrid.Paging.IsLastPage = customgrid.Paging.PageIndex === customgrid.Paging.TotalPages || customgrid.Paging.TotalPages == 0;
        customgrid.Paging.CurrentItemsCount = currentItemsCount >= totalItems ? totalItems : currentItemsCount;
    };

})(app.CustomGrid = {});
