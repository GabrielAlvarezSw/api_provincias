function success(data){
	r={success: true}
	if(data){
		r.data = data
	}
	return r
}
function fail(error){
	r={success:false}
	if(error){
		r.error = error
	}
	return r
}

module.exports={
	success,
	fail
}