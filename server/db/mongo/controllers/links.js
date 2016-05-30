import Link from '../models/links';
import User from '../models/user';
import CategoryTree from '../models/categoryTree';

const LinkFunction = {
		addLink: (req, res, next) => {
		let userId = req.body.userId;
		let categoryId = req.body.categoryId;
		let link = req.body.link;
		let title = req.body.title;
		let tag = req.body.tag;

		new Link({
			link: link,
			title: title,
			tag: tag
		})
		.save()
		.then((savedLink) => {
			//링크를 유저의 mylink에 넣는다.
			User.findOne({
				_id:userId
			})
			.then((user) => {
				user.myLink.push(savedLink._id);
				user
				.save()
				.then((saved) => {
					//링크를 category에 넣는다.(categoryTree에 링크를 category에 넣는 함수가 또 하나 있으니 사용해도 됨.)
					CategoryTree.findOne({
						_id: categoryId
					})
					.then((foundCategory) => {

						foundCategory.links.push(savedLink._id);
						foundCategory
						.save()
						.then((r) => {
							console.log('successfully link saved. ',r)
							res.status(200).json(r)
						})
						.catch((e) => {
							return console.error(e);
						})
					})
				})
			})
		})
		.catch(function (e) {
			return console.error(e);
		})
	},
	deleteLink: (req, res, next) => {
		let linkId = req.body.linkId;
		Link.findOne({
			_id: linkId
		})
		.remove()
		.then((result) => {
			//링크를 myLink에 가지고 있는 유저에게 가서 해당 linkId를 빼 줍니다.
			User.findOne({
				myLink : linkId
			})
			.then((user) => {
				if(!user) return console.error('No User that have this link in MyLink.')
				user.myLink.splice(user.myLink.indexOf(linkId),1);
				user.save()
				.then((savedUser) => {
					//클래스에 가서 삭제하기.
					CategoryTree.findOne({
						links : linkId
					})
					.then((categoryNode) => {
						if(!categoryNode) return console.error('No Category that have this link in links.')
						categoryNode.links.splice(categoryNode.links.indexOf(linkId),1);
						categoryNode.save()
						.then((r) => {
							console.log('successfully deleted.');
							res.status(200).json(r);
						})
						.catch((e) => {
							console.error(e);
						})
					})
					.catch((e) =>{
						console.error(e);
					})

				})
			})
			.catch((e) => {
				console.error('ERROR : deleting link from user')
			})
		})
		.catch((e) => {
			console.error('ERROR WITH DELETING LINK ',e);
		})
	},
	likeLink: (req, res, next) => {
		let linkId = req.body.linkId;
		Link.update({
			_id: linkId
		},{
			$inc: { like: 1}
		},{})
		.then((result) => {
			res.status(200).json({ message: 'successfully added to like '});
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF LINK: ',e)
		})
	},
	unlikeLink: (req, res, next) => {
		let linkId = req.body.linkId;
		Link.update({
			_id: linkId
		},{
			$inc: { like: -1}
		},{})

		.then((result) => {
			res.status(200).json({ message: 'successfully unlike'});
		})
		.catch((e) => {
			console.error('ERROR WITH UPDATING LIKES OF LINK: ',e)
		})
	}
}


module.exports = LinkFunction
