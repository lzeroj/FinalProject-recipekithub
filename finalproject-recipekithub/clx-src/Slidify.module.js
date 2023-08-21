/************************************************
 * Slidify2.module.js
 * Created at 2019. 1. 3. 오후 12:56:32.
 *
 * @author jeeeyul
 ************************************************/

/**
 * 
 * @param {Event} e
 */
function eventStopper(e) {
	e.stopPropagation();
	e.preventDefault();
}

/**
 * 
 * @param {cpr.controls.Container} container
 */
function SlideView(container) {
	this._container = container;
	/** @type cpr.controls.layouts.FlowLayout */
	this._layout = container.getLayout();
};

/**
 * 한 페이지에서 표시할 콘텐츠 수
 */
SlideView.prototype.showCount = 2;

/**
 * 페이지 내 한 컨텐츠의 너비. 0인 경우 비율로 균등 분배합니다.
 */
SlideView.prototype.itemSize = 0;

/**
 * 자동 재생시 애니메이션의 길이. 단위 초.
 */
SlideView.prototype.autoPlayDuration = 1.0;

/**
 * 자동 재생시, 각 재생간의 간격. 단위 초. 0 이상의 값을 주면 start()시 자동 재생이 시작됩니다. 0을 주는 경우, 자동으로 재생을 시작하지 않습니다.
 */
SlideView.prototype.autoPlayDelay = 0;

/**
 * 터치 또는 마우스로 드래그중 놓았을 때, 스내핑 애니메이션의 길이. 단위 초.
 */
SlideView.prototype.snapDuration = 0.3;

/**
 * 페이지니션을 표시할 것인지 여부.
 */
SlideView.prototype.showPaginition = true;

/**
 * 좌우 버튼의 너비
 */
SlideView.prototype.navigationButtonWidth = 30;

/** 
 * 좌우버튼에 추가적으로 줄 클래스 명.
 * @type String 
 */
SlideView.prototype.navigationButtonClassName = null;

/**
 * 무한 스크롤 사용 여부.
 */
SlideView.prototype.useInfiniteScroll = false;

/**
 * 네비게이션 버튼 표시 스타일
 * <li>hover: 컨테이너 가장자리에 호버 시킴</li>
 * <li>outside: 컨테이나 가장자리 바깥쪽에 표시</li>
 * <li>content-hover: 가운데 정렬된 콘텐츠의 가장자리에 호버 시킴</li>
 * <li>content-outside: 가운데 정렬된 콘텐츠의 가장자리에 바깥쪽에 표시</li></li>
 * <li>none: 버튼 표시 안함</li>
 */
SlideView.prototype.navigationButtonStyle = "inside";

/**
 * 시작 페이지 번호 0부터 시작.
 */
SlideView.prototype.initialPage = 0;

/**
 * <li>left: 시작 컨트롤이 왼쪽 끝에서 시작</li>
 * <li>center: 시작 컨트롤이 가운데에서 시작</li>
 * <li>right: 시작 컨트롤이 오른쪽 끝에서 시작</li>
 */
SlideView.prototype.startAlign = "left";

/**
 * @type SlidePaginition
 */
SlideView.prototype._paginition = null;
/**
 * @type cpr.controls.UIControl[]
 */
SlideView.prototype._originalChildren = [];
SlideView.prototype._knownScreenX = -1;
SlideView.prototype._initialScrollLeft = -1;
/** @type cpr.controls.Container */
SlideView.prototype._innerContainer = null;
/** @type cpr.controls.layouts.FlowLayout */
SlideView.prototype._innerLayout = null;

/** @type cpr.geometry.Rectangle */
SlideView.prototype._knownBounds = null;

/** @type cpr.controls.Button */
SlideView.prototype._prevButton = null;

/** @type cpr.controls.Button */
SlideView.prototype._nextButton = null;

/** @type cpr.animation.Animator */
SlideView.prototype._activeAnimator = null;
SlideView.prototype._autoPlayTimerID = -1;

SlideView.prototype._transform = function() {
	var height = this._container.getViewPortRect().height;
	this._container.style.addClass("cl-unselectable");
	this._layout.horizontalAlign = "center";
	this._layout.scrollable = false;
	this._originalChildren = this._container.getChildren();

	this._innerContainer = new cpr.controls.Container();
	var layout = new cpr.controls.layouts.FlowLayout();
	layout.lineWrap = false;
	layout.scrollable = false;
	layout.spacing = this._layout.spacing;
	this._innerContainer.setLayout(layout);
	this._innerLayout = layout;
	this._layout.spacing = 0;
	this._layout.scrollable = false;

	var itemConstraint = {
		height: "100%"
	};

	var itemSizeExpression = this.itemSize + "px";

	if (this.itemSize <= 0) {
		itemSizeExpression = "(100% - " + (this.showCount) * layout.spacing + "px) / " + this.showCount;
		itemConstraint.width = "calc(" + itemSizeExpression + ")";
	} else {
		itemConstraint.width = this.itemSize + "px";
	}

	if (this.useInfiniteScroll === false) {
		switch (this.startAlign) {
			case "center":
				{
					var padder = new cpr.controls.Output();
					padder.style.addClass("placeholder");
					this._innerContainer.addChild(padder, {
						width: cpr.utils.Util.template("calc((100% - ${spacing} - ${eachWidth}) / 2 - ${spacing})", {
							eachWidth: "(" + itemSizeExpression + ")",
							spacing: layout.spacing + "px"
						}),
						height: "100%"
					});
					break;
				}

			case "right":
				{
					var padder = new cpr.controls.Output();
					padder.style.addClass("placeholder");
					this._innerContainer.addChild(padder, {
						width: cpr.utils.Util.template("calc(100% - 2 * ${spacing} - ${eachWidth})", {
							eachWidth: "(" + itemSizeExpression + ")",
							spacing: layout.spacing + "px"
						}),
						height: "100%"
					});
					break;
				}
		}
	}

	this._container.getChildren().forEach((function( /* cpr.controls.UIControl */ each, idx) {
		each.userAttr("-snap-point", "true");
		this._innerContainer.addChild(each, itemConstraint);
	}).bind(this));
	this._container.addChild(this._innerContainer, {
		width: this.itemSize > 0 ? this.showCount * this.itemSize + (this.showCount - 1) * layout.spacing + "px" : "100%",
		height: "100%"
	});

	this._paginition = new SlidePaginition(this);
	this._container.getParent().floatControl(this._paginition.control);
}

/**
 * 슬라이드뷰를 시작합니다.
 * 시작하기전 모든 설정이 마쳐져야 합니다.
 */
SlideView.prototype.start = function() {
	if (this._container.getActualRect().width === 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(this.start.bind(this));
		return;
	}

	this._transform();

	this._onMouseDown = this._onMouseDown.bind(this);
	this._onMouseUp = this._onMouseUp.bind(this);
	this._onMouseMove = this._onMouseMove.bind(this);

	this._onTouchEnd = this._onTouchEnd.bind(this);
	this._onTouchStart = this._onTouchStart.bind(this);
	this._onTouchMove = this._onTouchMove.bind(this);

	this._doUpdateButtons = _.debounce(this._doUpdateButtons.bind(this), 500);
	this._updateActivePageButton = _.debounce(this._updateActivePageButton.bind(this), 50);

	this._onResize = this._onResize.bind(this);

	this._innerContainer.addEventListener("scroll", this._updateActivePageButton);
	this._container.addEventListener("mousedown", this._onMouseDown);
	this._container.addEventListener("touchstart", this._onTouchStart);
	this._container.addEventListenerOnce("dispose", this._handleDispose.bind(this));
	cpr.core.NotificationCenter.INSTANCE.subscribe("main-size-changed", this, this._updateButtons);
	cpr.core.NotificationCenter.INSTANCE.subscribe("swipe-transition-occured", this, this._onResize);
	cpr.core.NotificationCenter.INSTANCE.subscribe(cpr.core.SystemTopics.RESIZE, this, this._onResize);
//	cpr.core.NotificationCenter.INSTANCE.subscribe(TAB_FOLDER_CHANGED, this, this._onResize);

	this._updateActivePageButton();

	if (this.autoPlayDelay > 0) {
		this.autoPlay();
	}

	if (this.initialPage > 0) {
		cpr.core.DeferredUpdateManager.INSTANCE.asyncExec((function() {
			if (this._container.disposed) {
				return;
			}
			this.setActivePage(this.initialPage);
		}).bind(this));
	}

	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec((function() {
		if (this._container.disposed) {
			return;
		}
		this._doUpdateButtonsImmediatly();
	}).bind(this));
};

/**
 * 자동 재생을 시작합니다. autoPlayDelay가 지정된 경우, 슬라이드 시작시 자동으로 재생이 시작됩니다.
 */
SlideView.prototype.autoPlay = function() {
	if (this._autoPlayTimerID >= 0) {
		return;
	}
	this._autoPlayTimerID = setInterval(this.showNext.bind(this), (this.autoPlayDelay + this.autoPlayDuration) * 1000);
};

/**
 * 자동 재생중인 경우, 자동 재생을 중단합니다.
 */
SlideView.prototype.stopAutoPlay = function() {
	if (this._autoPlayTimerID >= 0) {
		clearInterval(this._autoPlayTimerID);
		this._autoPlayTimerID = -1;
	}
};

SlideView.prototype._handleDispose = function() {
	this.stopAutoPlay();
	this._container.removeEventListener("mousedown", this._onMouseDown);
	this._container.removeEventListener("touchstart", this._onTouchStart);
	cpr.core.NotificationCenter.INSTANCE.unsubcribeAllTopic(this);
};

/**
 * 터치 시작 처리 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchStart = function(e) {
	if (this._activeAnimator) {
		return;
	}

	var touch = e.targetTouches.item(0);
	this._knownScreenX = touch.screenX;
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;

	window.addEventListener("touchmove", this._onTouchMove);
	window.addEventListener("touchend", this._onTouchEnd);

	e.stopPropagation();
	this.stopAutoPlay();
};

/**
 * 터치 이동 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchMove = function(e) {
	var touch = e.targetTouches.item(0);
	this._handleMove(touch.screenX);
	e.stopPropagation();
	e.preventDefault();
};

/**
 * 터치 종료 핸들러
 * @param {cpr.events.CTouchEvent} e
 */
SlideView.prototype._onTouchEnd = function(e) {
	window.removeEventListener("touchmove", this._onTouchMove);
	window.removeEventListener("touchend", this._onTouchEnd);
	this._knownScreenX = -1;
	this._snapToClosestContent();
};

/**
 * 마우스 다운 핸들러
 * @param {cpr.events.CMouseEvent} e
 */
SlideView.prototype._onMouseDown = function(e) {
	if (e.button !== 0) {
		return;
	}
	if (this._activeAnimator) {
		return;
	}

	// 마우스가 다운 된 위치를 기억 해 둠.
	this._knownScreenX = e.screenX;

	// 현재 뷰포트의 위치를 기억해 둠.
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;

	window.addEventListener("mouseup", this._onMouseUp);
	window.addEventListener("mousemove", this._onMouseMove);

	// 혹시라도 마우스 업이 내비게이션 버튼에서 일어나, 드래깅 상태가 지속되는 문제를 미연에 방지.
	if (this._prevButton && this._nextButton) {
		this._prevButton.removeEventListener("mouseup", eventStopper);
		this._nextButton.removeEventListener("mouseup", eventStopper);
	}

	this.stopAutoPlay();
	e.stopPropagation();
};

/**
 * 마우스/터치의 이동 처리. 
 * @param {Number} screenX
 */
SlideView.prototype._handleMove = function(screenX) {
	var container = this._innerContainer;
	var layout = this._innerLayout;

	// 스크롤 불능일 경우 중단.
	if (container.getViewPortRect().width >= container.getContentPaneRect().width) {
		return;
	}

	if (this._knownScreenX < 0) {
		return;
	}

	// 터치/마우스의 이동량을 구함.
	var delta = this._knownScreenX - screenX;

	// 새로운 뷰포트의 위치
	var newScrollLeft = this._initialScrollLeft + delta;

	// 왼쪽 경계선 너머로 스크롤.
	if (newScrollLeft < 0) {
		if (this.useInfiniteScroll === false) {
			container.scrollTo(0, 0);
			return;
		}
		var children = container.getChildren();

		// 오른쪽 끝 자식을 떼어 내어 왼쪽으로 이동시키고, 스크롤 상황을 업데이트 함.
		var lastChild = children[children.length - 1];
		container.reorderChild(lastChild, 0);
		var fix = this._innerLayout.spacing + lastChild.getOffsetRect().width;
		this._initialScrollLeft += fix;
		container.scrollTo(fix, 0);
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		return;
	}

	// 오른쪽 경계선 너머로 스크롤.
	else if (newScrollLeft + container.getViewPortRect().width > container.getContentPaneRect().width) {
		if (this.useInfiniteScroll === false) {
			container.scrollTo(container.getContentPaneRect().width - container.getViewPortRect().width, 0);
			return;
		}
		var children = container.getChildren();

		// 첫번째 자식을 떼어내어 오른쪽 끝으로 이동시키고 스크롤 상황을 업데이트 함.
		var firstChild = children[0];

		var fix = firstChild.getOffsetRect().width + this._innerLayout.spacing;
		this._initialScrollLeft -= fix;
		container.reorderChild(firstChild, children.length);
		container.adjustScroll(-fix, 0);
		cpr.core.DeferredUpdateManager.INSTANCE.update();
		return;
	}

	container.scrollTo(newScrollLeft, 0);
}

/**
 * 
 * @param {MouseEvent} e
 */
SlideView.prototype._onMouseMove = function(e) {
	this._handleMove(e.screenX);
	e.preventDefault();
};

/**
 * 
 * @param {MouseEvent} e
 */
SlideView.prototype._onMouseUp = function(e) {
	window.removeEventListener("mouseup", this._onMouseUp);
	window.removeEventListener("mousemove", this._onMouseMove);
	this._knownScreenX = -1;
	this._snapToClosestContent();
	if (this._prevButton && this._nextButton) {
		this._prevButton.addEventListener("mouseup", eventStopper);
		this._nextButton.addEventListener("mouseup", eventStopper);
	}
};

SlideView.prototype._updateButtons = function() {
	if (this._container.disposed) {
		return;
	}
	if (this._prevButton) {
		this._prevButton.dispose();
		this._prevButton = null;
	}
	if (this._nextButton) {
		this._nextButton.dispose();
		this._nextButton = null;
	}

	this._paginition.control.visible = false;
	this._doUpdateButtons();
}

SlideView.prototype._doUpdateButtonsImmediatly = function() {
	if (this._container.disposed) {
		return;
	}

	this._knownBounds = this._container.getOffsetRect();

	var shouldShowButtons = this._innerContainer.getChildrenCount() > 1 && this._innerContainer.getViewPortRect().width < this._innerContainer.getContentPaneRect().width;
	if (!shouldShowButtons) {
		if (this._prevButton) {
			this._prevButton.dispose();
			this._prevButton = null;
		}
		if (this._nextButton) {
			this._nextButton.dispose();
			this._nextButton = null;
		}
		this._paginition.control.visible = false;
	} else {
		this._paginition.control.visible = this.showPaginition;
		if (this.showPaginition) {
			this._paginition.control.style.css({
				top: this._knownBounds.bottom + "px",
				left: this._knownBounds.left + "px",
				width: this._knownBounds.width + "px"
			});
			this._paginition.control.style.animateFrom({
				"opacity": "0"
			});
		}

		if (this.navigationButtonStyle != "none") {
			this._prevButton = new cpr.controls.Button();
			this._prevButton.style.addClass("slide-button");
			this._prevButton.style.addClass("slide-prev-button");
			if (this.navigationButtonClassName) {
				this._prevButton.style.addClass(this.navigationButtonClassName);
			}
			this._prevButton.addEventListener("click", (function() {
				this.stopAutoPlay();
				this.showPrev();
			}).bind(this));

			this._prevButton.addEventListener("mousedown", eventStopper);
			this._prevButton.addEventListener("mouseup", eventStopper);
			this._prevButton.addEventListener("click", eventStopper);
			this._nextButton = new cpr.controls.Button();
			this._nextButton.style.addClass("slide-button");
			this._nextButton.style.addClass("slide-next-button");
			if (this.navigationButtonClassName) {
				this._nextButton.style.addClass(this.navigationButtonClassName);
			}
			this._nextButton.addEventListener("click", (function() {
				this.stopAutoPlay();
				this.showNext();
			}).bind(this));
			this._nextButton.addEventListener("mousedown", eventStopper);
			this._nextButton.addEventListener("mouseup", eventStopper);
			this._nextButton.addEventListener("click", eventStopper);

			var superContainer = this._container.getParent();
			var leftCosntraint = {
				left: this._knownBounds.left + "px",
				top: this._knownBounds.top + "px",
				height: this._knownBounds.height + "px",
				width: this.navigationButtonWidth + "px"
			};
			var rightConstraint = {
				left: this._knownBounds.right - this.navigationButtonWidth + "px",
				top: this._knownBounds.top + "px",
				height: this._knownBounds.height + "px",
				width: this.navigationButtonWidth + "px"
			};
			switch (this.navigationButtonStyle) {
				case "inside":
					{
						break;
					}
				case "content-hover":
					{
						var offsetRect = this._innerContainer.getOffsetRect();
						leftCosntraint.left = offsetRect.x + "px";
						leftCosntraint.top = offsetRect.y + "px";
						rightConstraint.left = offsetRect.right - this.navigationButtonWidth + "px";
						rightConstraint.top = offsetRect.y + "px";
						superContainer = this._container;
						break;
					}
				case "content-outside":
					{
						var offsetRect = this._innerContainer.getOffsetRect();
						leftCosntraint.left = offsetRect.x - this.navigationButtonWidth + "px";
						leftCosntraint.top = offsetRect.y + "px";
						rightConstraint.left = offsetRect.right + "px";
						rightConstraint.top = offsetRect.y + "px";
						superContainer = this._container;
						break;
					}
				case "outside":
					{
						leftCosntraint.left = this._knownBounds.left - this.navigationButtonWidth + "px";
						rightConstraint.left = this._knownBounds.right + "px";
						break;
					}
			}

			superContainer.floatControl(this._prevButton, leftCosntraint);
			superContainer.floatControl(this._nextButton, rightConstraint);
			this._prevButton.visible = false;
			this._nextButton.visible = false;
			cpr.core.DeferredUpdateManager.INSTANCE.asyncExec((function() {
				if (this._container.disposed) {
					return;
				}
				if (this._prevButton) {
					this._prevButton.visible = true;
					this._prevButton.style.animateFrom({
						"opacity": "0"
					});
				}
				if (this._nextButton) {
					this._nextButton.visible = true;
					this._nextButton.style.animateFrom({
						"opacity": "0"
					});
				}
			}).bind(this));

		}
		//		this._snapToClosestContent();
	}

}

SlideView.prototype._doUpdateButtons = function() {
	if (this._container.disposed) {
		return;
	}
	this._doUpdateButtonsImmediatly();
};

SlideView.prototype._onResize = function() {
	if (this._container.disposed) {
		return;
	}

	// 처음 그리는 경우.
	if (!this._knownBounds) {
		this._updateButtons();
	}

	// 그외의 경우, 컨테이너의 영역이 달라진 경우에만 새로 그림.
	else if (this._knownBounds.equals(this._container.getOffsetRect()) === false) {
		this._updateButtons();
	}
};

SlideView.prototype.showPrev = function() {
	if (this._activeAnimator) {
		return;
	}
	this._snapToClosestContent(0);
	this._knownScreenX = 0;
	this._initialScrollLeft = this._innerContainer.getViewPortRect().x;
	var animator = new cpr.animation.Animator(this.autoPlayDuration, cpr.animation.TimingFunction.EASE_IN_OUT);
	var me = this;
	var fullWidth = this._innerContainer.getViewPortRect().width;
	animator.addTask(function(p) {
		me._handleMove(p * fullWidth);
	});
	this._activeAnimator = animator;
	animator.run().then((function() {
		this._activeAnimator = null;
	}).bind(this));
};

SlideView.prototype.showNext = function() {
	if (this._activeAnimator) {
		return;
	}

	var target = this._findMostCloseControl(this._innerContainer.getViewPortRect().right);
	if (target) {
		var offset = target.getOffsetRect().right;
		this._innerContainer.scrollTo(offset - this._innerContainer.getViewPortRect().width, 0, this.autoPlayDuration);
	}
};

/**
 * 가장 가까운 컨텐츠로 스크롤 시킵니다.
 * @param {Number} viewportX
 * @param {Boolean} rightFirst (Optional)
 */
SlideView.prototype._findMostCloseControl = function(viewportX, rightFirst) {
	if (rightFirst === undefined) {
		rightFirst = false;
	}
	var shortedDistance = Number.MAX_VALUE;
	/** @type cpr.controls.UIControl */
	var controlToScroll = null;
	var children = this._innerContainer.getChildren();
	if (rightFirst) {
		children = children.reverse();
	}
	children.filter(function( /* cpr.controls.UIControl */ each) {
		return each.userAttr("-snap-point") == "true";
	}).forEach((function( /* cpr.controls.UIControl */ each) {
		var eachDistance = Math.abs(each.getOffsetRect().x - this._innerLayout.spacing - viewportX);
		if (eachDistance < shortedDistance) {
			shortedDistance = eachDistance;
			controlToScroll = each;
		}
	}).bind(this));
	return controlToScroll;
};

/**
 * 가장 가까운 컨텐츠로 스크롤 시킵니다.
 */
SlideView.prototype._snapToClosestContent = function(duration) {
	if (duration == null) {
		duration = this.snapDuration;
	}
	if (this._container.disposed) {
		return;
	}

	var viewPortRect = this._innerContainer.getViewPortRect();
	var controlToScroll = this._findMostCloseControl(viewPortRect.x)
	if (controlToScroll && viewPortRect.width >= controlToScroll.getOffsetRect().width) {
		this._innerContainer.scrollTo(controlToScroll.getOffsetRect().x - this._innerLayout.spacing, 0, duration, cpr.animation.TimingFunction.EASE_OUT_CUBIC);
	}
};

SlideView.prototype.getActivePage = function() {
	var control = this._findMostCloseControl(this._innerContainer.getViewPortRect().x);
	return Math.floor(this._originalChildren.indexOf(control) / this.showCount);
};

/**
 * @param {Number} page
 * @param {Number} duration (Optional)
 */
SlideView.prototype.setActivePage = function(page, duration) {
	if (this._container.disposed) {
		return;
	}
	if (duration == null) {
		duration = 0;
	}
	var targetControl = this._originalChildren[page * this.showCount];
	if (targetControl) {
		console.log(targetControl);
		this._innerContainer.scrollTo(targetControl.getOffsetRect().x - this._innerLayout.spacing, 0, duration);
	}
};

SlideView.prototype._updateActivePageButton = function() {
	if (this._container.disposed) {
		return;
	}
	var activePage = this.getActivePage();
	this._paginition.control.getChildren().forEach(function( /* cpr.controls.Button */ each, idx) {
		if (idx == activePage) {
			each.style.addClass("active");
		} else {
			each.style.removeClass("active");
		}
	});
}

/**
 * 
 * @param {SlideView} owner
 */
function SlidePaginition(owner) {
	this._owner = owner;
	this.control = new cpr.controls.Container();
	this.control.visible = false;
	var layout = new cpr.controls.layouts.FlowLayout();
	layout.horizontalMargin = 0;
	layout.verticalMargin = 0;
	layout.horizontalAlign = "center";
	layout.verticalAlign = "middle";
	this.control.setLayout(layout);
	this._populateButtons();
};

/** @type cpr.controls.Container */
SlidePaginition.prototype.control = null;

SlidePaginition.prototype._populateButtons = function() {
	var pageCount = Math.ceil(this._owner._originalChildren.length / this._owner.showCount);
	for (var idx = 0; idx < pageCount; idx++) {
		(function(idx) {
			var pageButton = new cpr.controls.Button();
			pageButton.style.addClass("slide-page-button");
			pageButton.addEventListener("click", (function(e) {
				this._owner.stopAutoPlay();
				if (this._owner._activeAnimator) {
					this._owner._activeAnimator.stop();
					this._owner._activeAnimator = null;
				}
				this._owner.setActivePage(idx, this._owner.autoPlayDuration);
			}).bind(this));
			this.control.addChild(pageButton, {
				width: "20px",
				height: "20px",
				autoSize: "both"
			});
		}).bind(this)(idx);
	}
};

/**
 * 
 * @param {cpr.controls.Container} container
 */
exports.slidify = function(container) {
	return new SlideView(container);
};

exports.SlideView = SlideView;