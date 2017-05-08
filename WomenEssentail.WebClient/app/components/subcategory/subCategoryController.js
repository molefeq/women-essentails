(function () {

    'use strict';

    angular.module('app').controller('subCategoryController', SubCategoryController);

    SubCategoryController.$inject = ['$scope', '$rootScope', '$state', 'notificationFactory', 'subCategoryFactory'];

    function SubCategoryController($scope, $rootScope, $state, notificationFactory, subCategoryFactory) {
        var viewModel = $scope;

        viewModel.subCategoryFactory = subCategoryFactory;
        viewModel.addSubCategory = addSubCategory;
        viewModel.editSubCategory = editSubCategory;
        viewModel.deleteSubCategory = deleteSubCategory;
        viewModel.searchSubCategories = searchSubCategories;

        viewModel.SearchFilter = {
            PageData: {
                Take: 30,
                Skip: 0
            },
            SearchText: '',
            ShowAll: true
        };

        viewModel.subCategoriesGridOptions = {
            Paging: {
                PageIndex: 1,
                PageSize: 5
            },
            PageSizes: [30, 40, 60, 90, 100],
            Read: function (options) {
                var that = this;

                $rootScope.isLoading = true;
                $rootScope.loadingMessage = 'Loading data, please wait ...';

                viewModel.SearchFilter.PageData.Take = options.take;
                viewModel.SearchFilter.PageData.Skip = options.skip;

                viewModel.subCategoryFactory.searchSubCategories(viewModel.SearchFilter).then(function (response) {
                    viewModel.subCategoriesGrid.SetDataSource(response.SubCategories, response.TotalSubCategories);
                    $rootScope.isLoading = false;
                });
            }
        };

        viewModel.$on('app-grid-rendered', function (event, data) {
            viewModel.subCategoryFactory.initialise().then(function () {
                viewModel.subCategoriesGrid.SetPage(null, 1);
            });
        });

        viewModel.$on('sucategory-updated', function (event, data) {
            viewModel.subCategoriesGrid.SetPage(null, viewModel.subCategoriesGrid.Paging.PageIndex);
        });

        function searchSubCategories() {
            viewModel.subCategoriesGrid.SetPage(null, 1);
        };

        function addSubCategory() {
            var newScope = $rootScope.$new();
            newScope.actionType = 'CREATE';
            viewModel.subCategoryFactory.subCategory = {};

            notificationFactory.open({
                templateUrl: 'subcategorytemplate.html',
                scope: newScope,
                size: 'lg',
                controller: subCategoryModalController
            });
        };

        function editSubCategory(subCategory) {
            viewModel.subCategoryFactory.edit(subCategory.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'UPDATE';

                notificationFactory.open({
                    templateUrl: 'subcategorytemplate.html',
                    scope: newScope,
                    size: 'lg',
                    controller: subCategoryModalController
                });
            });
        };

        function deleteSubCategory(subCategory) {
            viewModel.subCategoryFactory.edit(subCategory.Id).then(function (response) {
                var newScope = $rootScope.$new();
                newScope.actionType = 'DELETE';

                notificationFactory.open({
                    templateUrl: 'subcategorytemplate.html',
                    scope: newScope,
                    size: 'sm',
                    controller: subCategoryModalController
                });
            });
        }
    };

})();