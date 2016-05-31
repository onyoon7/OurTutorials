## SERVER
	1. 서버는 가장 기본적인 파일인 server/index.js 에서부터 파악하면 됩니다.
	2. index.js에서는 다양한 파일을 import해서 app에 통합시켜줍니다.
	3.이 중에서 눈여겨보아야 할 파일은 routesConfig파일입니다. 이 파일에서 http request에 대해서 routing 설정을 해 줍니다.(server/config/routes.js)
	4. server/db 폴더에서는 mongo/ 폴더에서 작업하시면 됩니다.
	5. 나머지 폴더에는 다른 Db를 쓰기 위한 예시들이 들어있습니다.(무시하셔도 됩니다.)



##DB RELATION SUMMARY
	1. 유저 : 링크
		유저는 자신이 좋아요를 누른 링크, 만든 링크, bucket(일종의 장바구니)에 담은 링크의 ID를 가지고 있습니다.
		링크는 유저에 관한 정보를 담고 있지 않습니다.

	2. 카테고리 : 카테고리
		각 카테고리는 자식 카테고리와 부모 카테고리의 정보를 담고 있습니다.
		자식 카테고리는 한 단계 아래의 자식들을 배열로 가지고 있습니다.
		부모 카테고리는 **모든 조상 카테고리**의 항목을 배열로 담고 있습니다. 맨 마지막 요소가 가장 최근의 조상입니다.

	3. 카테고리 : 링크
		각 카테고리는 링크 항목에 링크의 아이디를 담은 배열을 가지고 있습니다.

	4. 카테고리 : 코스
		각 카테고리는 코스 항목에 코스의 아이디를 담은 배열을 가지고 있습니다.

	5. 유저 : 코스
		각 유저는 좋아요를 누른 코스, 자신이 만든 코스의 아이디를 배열로 가지고 있습니다.



##Parameter + MODEL SUMMARY
	1. 서버 쪽 컨트롤러 안내 / DB Query 날릴 때 파라메터 설정하는 법!
		*거의 다 POST로 설정이 되어 있습니다.
		데이터를 가져올 때도 POST리퀘스트를 보내는 경우가 대부분입니다(모두 body에서 데이터를 가져오기 때문에..)
		따라서 프론트엔드에서 쿼리를 날릴 때는 server/config/routes.js 하단의 라우터 구조를 보고 짝을 맞추어 쿼리를 날려주세요!


		1.CategoryTree
			> 각 링크들이 속하는 항목입니다. 트리 구조로 되어있습니다. 자바스크립트 밑에 서버/클라이언트/디비 등을 매달 수 있는 구조입니다.

			getChildrenCategoryes
				req.body.categoryId : 칠드런 클래스를 가져올
				부모 클래스 아이디 (없을경우 가장 상위 클래스들을 가져오게 된다.)
			getAllLinks
				req.body.categoryId : 링크를 가져올 기준 클래스 아이디 (이것은 empty경우 아무 데이터도 안나옴.)
			getAllCourses
				req.body.categoryId : 코스를 가져올 기준 클래스 아이디
			addCategory
				req.body.parentId : 새로운 클래스가 붙을 부모 클래스 아이디
				req.body.neqCategoryName : 새로운 클래스의 이름

		2.link
			> 말 그대로 링크입니다. 타이틀, 서머리, 그리고 링크 주소를 담고 있습니다.


			addLink
				*원래 링크에 summary field가 있으나 일단 구현하지 않았음.
				req.body.userId : 새로운 링크를 만든 유저 아이디
				req.body.categoryId : 새로운 링크가 속할 클래스의 Id
				req.body.link : 새로운 링크의 링크
				req.body.title : 새로운 링크의 제목
				req.body.tag : tag 배열 ex) ['tag1','tag2']
			deleteLink
				*req.body.linkId : 삭제할 링크 아이디

			likeLink/unlikeLink는 User 컨트롤러에서 활용하는 함수이므로 여기서는 신경쓰지 않아도 됨.


		3.course
			> 코스는 사람들이 직접 링크주소와 설명을 달아서 구성합니다.

			addCourse
				req.body.userId : course를 만든 유저 아이디
				req.body.categoryId : course가 속할 categoryId
				req.body.courseData : course의 실제 데이터 (객체형태)
				ex)
				{
					title: '',
					summary: '',
					contents: ''
				}
			deleteCourse
				req.body.courseId : 지울 코스 아이디



		4.user
			> 유저 모델은 코스, 링크 아이디들을 가지고 있습니다.
			> 코스, 링크에서는 유저에 대한 정보가 없음을 유의하시길 바랍니다.

			login, logout, signup : basic 세팅하고 똑같음
			addLinkToBucekt
				req.body.userId : 버켓에 넣을 유저 아이디
				req.body.linkId : 버켓에 넣을 링크 아이디
			likeLinkToggle :
				req.body.userId : 좋아요 누를 유저 아이디
				req.body.linkId : 좋아유 눌러진 링크 아이디
			likeCourseToggle :
				req.body.userId : 좋아요 누를 유저 아이디
				req.body.courseId : 좋아유 눌러진 코스 아이디

##서버 쪽 라우팅

	  ##category
	    app.post('/category', categoryController.addCategory);
	    app.get('/category', categoryController.getChildrenCategories);
	    app.post('/category/children', categoryController.getChildrenCategories);
	    app.post('/category/link', categoryController.getAllLinks);
	    app.get('/category/course', categoryController.getAllCourses);
	    app.delete('/category', categoryController.deleteCategoryTree);

	  ##link
	    app.post('/link', linkController.addLink);
	    app.delete('/link', linkController.deleteLink);

	  ##topic routes
	    app.get('/topic', topicsController.all);
	    app.post('/topic/:id', categoryController.addCategory);
	    app.put('/topic/:id', topicsController.update);
	    app.delete('/topic/:id', topicsController.remove);

	  ##코스 쪽은 디비와 쿼리는 기본적으로 갖추어져 있으나, 아직 라우팅에 연결하지 않았음.
	  	구현을 위해서는 클라이언트 페이지 마련과 서버쪽, 클라이언트 쪽 라우팅이 필요함.


## TIP : HOW TO SET DB RELATION?

	3가지 Basic Model of One-to-N relationship.

	   	1. One-to-N을 구현하는 기준.
				1) one-to-n 에서 n쪽이 얼마나 많은가?(cardinality 가 얼마나 되어야 하는가?)
				2) n쪽이 stand-alone entity가 되어야 하는가?

		        - one-to-few
					  예시 : 특정 사람의 거주지, 회사 주소 등 주소들. 직접 embeded!
		            - 아예 데이터 자체를 embeded해라. (schema 자체를 embeded)
		            - 장점: 쿼리를 embeded된 객체에 대해 따로 날릴 필요가 없다.
		            - 단점: 객체에 대해서 독립적으로 접근할 방법이 없다.
		        - one-to-many
		            - 아이디를 embeded해라.(일반적인 경우)
		        - one-to-squillions
		            - 부모에 자식의 id를 Array로 넣어도 16mb가 넘어가는 경우.
		            - 왜냐면 부모- 수억개의 자식이 있다고 했을 때, 부모로부터 자식을 검색하기 어렵다. (자식이 너무 많기 때문에.) 따라서 부모를 자식에 넣어놓는다.
		    - 정리 :
		        - n쪽이 squillion이면 볼것도 없이 자식의 entity에 부모의 id를 넣는 쪽으로 가야함.
		        - n쪽이 squillion이 아닐 경우에는 자식 entity가 어떤 이유에서든지 stand alone할 필요가 있으면(독립된 쿼리를 자식 entity대상으로만 날릴 일이 있다면) id의 array를 부모가 가지고 있도록 한다.
		        - 1도 2도 아니고 one-to-few일 경우에는 embedded object로 구현하면 된다.


		2.심화 : 복잡한 스키마 디자인(denormalization and two-way referencing)

			요약 : application-level join을 피하는 대신에, 더 높은 update 비용이 들게 한다.

			    - two-way-referencing
			        - one-to-many 관계에서, 부모와 자식이 둘다 서로의 id를 가지고 있는 경우
			        - 장점: 검색을 좀 더 신속하게 할 수 있다.
			        - 단점: update시 쿼리를 두 번 날려야 한다.
			    - Denoramlization :
			        - 부모가 자식의 id만 가지고 있는 것이 아니라, 이름도 가지고 있을 수 있음.
			        - update에 비용이 더욱 많이 든다.
			        - 즉, high ratio of reads to update일 때 적용된다.

			- one-to-many를 대할 때의 전체 선택지 검토
			    - 너무나 많은 de-normalize 방법을 대할 때의 6가지 관용 법칙
			        - 왠만하면 embedding 하라( 강력한 이유가 없는 한.)
			        - 어떤 object에 그 자체로 접근할 필요가 있다는 것은 embed하지 말아야 할 강력한 이유이다.
			        - High-cardilnality는 embed하지 말아야 할 강력한 이유이다. Array는 bound없이 길어지면 안된다. 만약 몇 백 개 이상의 ’n’ 부분이 존재한다면, embed하지마라. 만약 몇 천 개 이상의 objectId가 속해있다면, id도 배열로 갖고있지 말라.
			        - application 수준에서의 join을 두려워 하지 마라.
			            - projection specifier를 정확히 활용한다면 , server-side join in relational database보다 비용이 크지 않음.
			        - write/read 비율을 따져서 de-normalize하라.
			            - - 대부분 읽혀지기만 하고 거의 update되지 않는 field들이 denormalization의 좋은 대상이다.
			            - - 그렇지 않다면 denormalize하지 마라.
			        - 몽고DB에서 언제나 그렇듯이, 당신의 data를 모델링 하는것은 전적으로 데이터 접근 패턴에 달렸다.
			    - 요약(one-to-N)
			        - 관계의 cardinality가 어떻게 되는가?
			        - “N”쪽의 object에 독립적으로 접근할 필요가 있는가?
			        - 특정 필드에 대해서 update대 read의 비율이 어떻게 되는가?





