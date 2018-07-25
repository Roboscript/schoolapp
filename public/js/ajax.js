////For students
$(document).ready(function(){
    $("a.studentsData").click(function(e){
      e.preventDefault();
      var tr = $(this).closest("tr");
      var modal = $("#editDetailModal");
      var id =tr.data("id");
      $.getJSON('/admin/admin-student-list-data?id=' + id, function (data) {
       modal.find("form").attr("action");//.attr("action" "/admin/admin-student-list-data/" );
       modal.find(".firstname").val( data.firstname );
       modal.find(".middlename").val( data.middlename );
       modal.find(".lastname").val( data.lastname );
       modal.find(".class").val( data.classs );
       modal.find(".section").val( data.section );
       modal.find(".roll").val( data.roll );
       modal.find(".contact").val( data.contact );
       modal.find(".email").val( data.email );
      });
    });

    ///delete student AJAX
    $("a.deletestudent").click(function(e){
      e.preventDefault();
      var tr = $(this).closest("tr");
      var modal = $("#deleteDetailModal");
      var id =tr.data("id");
      $.getJSON('/admin/admin-student-list-data?id=' + id, function (data) {
        document.getElementById("clickconfirm").addEventListener("click", clickconfirm);

       function clickconfirm(){
         $.get('/admin/admin-student-list-delete?id=' + id);
       }
       modal.find(".modal-tittle").text('DELETE ' + data.firstname + data.lastname);//.attr("action" "/admin/admin-student-list-data/" );

      });
    });

    ///for teachers
    $("a.teachersData").click(function(e){
      e.preventDefault();
      var tr = $(this).closest("tr");
      var modal = $("#editDetailModal");
      var id =tr.data("id");
      $.getJSON('/admin/admin-teacher-list-data?id=' + id, function (data) {
       modal.find("form").attr("action");//.attr("action" "/admin/admin-student-list-data/" );
       modal.find(".firstname").val( data.firstname );
       modal.find(".middlename").val( data.middlename );
       modal.find(".lastname").val( data.lastname );
       modal.find(".clss").val( data.classs );
       modal.find(".section").val( data.section );
       modal.find(".roll").val( data.roll );
       modal.find(".contact").val( data.contact );
       modal.find(".email").val( data.email );
      });
    });
///delete teachers
$("a.deleteteacher").click(function(e){
  e.preventDefault();
  var tr = $(this).closest("tr");
  var modal = $("#deleteDetailModal");
  var id =tr.data("id");
  console.log(id);
  $.getJSON('/admin/admin-teacher-list-data?id=' + id, function (data) {
    document.getElementById("clickconfirm").addEventListener("click", clickconfirm);

   function clickconfirm(){
     $.get('/admin/admin-teacher-list-delete?id=' + id);
   }
   modal.find(".modal-tittle").text('DELETE ' + data.firstname + data.lastname);//.attr("action" "/admin/admin-student-list-data/" );

  });
});
console.log("Ready");
///class get teachersData

});


function ty(){
  console.log("running");
  $.getJSON('/admin/admin-add-classData', function(data){
    var i;
    for(i in data){
      console.log(data[i].firstname);
    }

  });
$("select.class_teacher").click(function(){
  $.getJSON('/admin/admin-add-classData', function(data){
    console.log(data);
  });
});
}
