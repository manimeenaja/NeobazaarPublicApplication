describe('Controllers', function() {
    var scope, ctrl;
//you need to indicate your module in a test
    beforeEach(module('Neobazaar'));
    
	describe('BreadcrumbsController', function() {
		
		// Initialize the controller and a mock scope
		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('BreadcrumbsController', {
		        $scope: scope
			});
		}));
		
		it('should have test', function() {
			expect(scope.test()).toEqual('prova');
		});
	});
});