##Parameter
	##CategoryTree
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

	##link
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


	##course
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



	##user
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



