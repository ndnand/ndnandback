/**
 * Created by 王孟旭 on 2018/1/11.
 */
$(function (){
  var $form = $('form')
  //console.log($form)
  $form.bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message:"用户名错误",
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 30,
            message: '用户名长度必须在3到30之间'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 30,
            message: '密码长度必须在6到30之间'
          },
          callback: {
            message:"密码错误",
          },
        }
      },
    }
  });

  $form.on('success.form.bv', function (e) {
    e.preventDefault();
    //console.log("黑咯嘿嘿")
    $.ajax({
        type:'post',
        datatype:'json',
        data:$form.serialize(),
        url:'/employee/employeeLogin',
        success:function(data) {
          if(data.success)
          location.href = "index.html";
          if(data.error === 1000){
               //alert("用户名不存在");
            $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
          }
          if(data.error === 1001) {
            $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
          }
        }
      })
  })
})