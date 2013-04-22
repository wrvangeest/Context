describe("Javascript functions", function () {
	describe("Video functions", function () {

	});

	describe("Misc functions", function () {
		it("checkTime should stop", function() {
			var cb = checkTime(function(dur) { return dur }, 500);
			expect(cb).toEqual(-1);
		});

	});

	describe("Tag functions", function () {

	});
});