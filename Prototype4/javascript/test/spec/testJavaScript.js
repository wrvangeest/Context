describe("Test tagdata.js",function(){

	it("test getAssocId",function(){
		//in case of zappoint
		elem = document.createElement("li");
   		elem.className = 'icon-bolt';
   		elem.id = 'zappoint12';

		var zapId = getAssocId(elem);
		expect(zapId).toBe('.btn.t12');

		//in case of tag
		elem = document.createElement("button");
   		elem.className = 'btn btn-info tager t5';

		var zapId = getAssocId(elem);
		expect(zapId).toBe('#zappoint5');
	});

	it("test ConverTime",function(){


		var value = convertTime(270);
		console.log(value);
		expect(value).toBe('4:30');
		value = convertTime(55);
		expect(value).toBe('0:55');
		value = convertTime(7);
		expect(value).toBe('0:07');
		value = convertTime(0);
		expect(value).toBe('0:00');
		value = convertTime(-10);
		expect(value).toBe('0:00');

	});

	/*
	it("test createZapCode",function(){
		var obj = [{term:"greece",time:"10:29"}];
		var zapCode = createZapCode(obj);
		zapCode.calcDist(item) = jasmine.createSpy("calcDist(item) spy").ancCallFake(function() {return 0;});

		console.log(zapCode);
		elem = document.createElement("li");
		elem.className = "icon-bolt zappoint";
		elem.id = "zappoint0";

		elem.append('<img src=http://placehold.it/350x150><br/>')
			.append('at approximately ' + time + '<br/>');

	});*/

});