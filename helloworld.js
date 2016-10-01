var Page1 = React.createClass({
  getInitialState:function(){
    return {
      pager:1,
      money:0
    };
  },
  hasSubmit:function(moneyInput){
    this.setState({
      pager:2,
      money:moneyInput
    });
  },
  renderBody:function(){
    if(this.state.pager==1){
      return (
        <PageForm submitForm={this.hasSubmit}/>
      );
    }
    else{
      return (
        <PageResult ammount={this.state.money} />
      );
    }
  },
  render:function(){
    return (
      <div className="page">
        <PageHead pager={this.state.pager} />
        {this.renderBody()}
      </div>
    );
  }
});
var PageHead = React.createClass({
  render:function(){
    if(this.props.pager==1){
      return (
        <div className="pageHead clearfix">
          <div className="headLeft pull-left"></div>
          <div className="headRight pull-right">
            <div>转账</div>
            <div>微信安全支付</div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="pageHead clearfix">
          <div className="headRight addPadding">
            <div>交易详情</div>
            <div>微信安全支付</div>
          </div>
        </div>
      );
    }
  }
});
var PageForm = React.createClass({
  getInitialState:function(){
    return {
      money:666
    };
  },
  submitForm:function(event){
    event.preventDefault();
    this.props.submitForm(this.state.money);
  },
  inputHandler:function(value){
    this.setState({
      money:value
    });
  },
  render:function(){
    return (
      <div className="pageForm">
        <form>
          <PageInput inputHandle={this.inputHandler} />
          <button className="greenbtn btn" onClick={this.submitForm}>转账</button>
        </form>
      </div>
    );
  }
});
var PageInput = React.createClass({
  inputing:function(){
    var ammount = this.myTextInput.value;
    var pos=ammount.indexOf('.');
    if(pos<0){
      //without . means it is int
      ammount = ammount+'.00';
    }else{
      if(ammount.length==pos+2){
        // .0
        ammount = ammount+'0';
      }
    }
    this.props.inputHandle(ammount);
  },
  render:function(){
    return (
      <div className="inputBox">
        <p>转账金额</p>
        <p>
          <span>¥</span>
          <input type="text" ref={(ref) => this.myTextInput = ref} onChange={this.inputing} />
        </p>
      </div>
    );
  }
});
var PageResult = React.createClass({
  render:function(){
    return (
      <div className="pageResult">
        <ResultSuccess />
        <div className="ammount-line text-center">¥{this.props.ammount}</div>
        <button className="greenbtn btn">完成</button>
      </div>
    );
  }
});
var ResultSuccess = React.createClass({
  render:function(){
    return (
      <div>
        <div className="logo-continer">
          <div className="bingo middle"></div>
        </div>
        <div className="success-line text-center">支付成功</div>
        <div className="accepter-line text-center">收款方陈贺瑶</div>
      </div>
    );
  }
});
ReactDOM.render(
  <Page1 />,
  document.getElementById('example')
);