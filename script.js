/***
 * .js-accords_one - open one element at a time
 * .js-accords_mult - open any amount
 */
function accordeonBaseFunction() {
  function initAccordAll() {
    const accordeonsMulti = $('.js-accords_mult');
    accordeonsMulti.each(function () { 
      console.log()
      $(this).find('.js-accord').each(function () { 
        initAccordElement($(this), 0);
      });
    });

    const accordeonsSingle= $('.js-accords_one');
    accordeonsSingle.each(function () { 
      const accordeonsSingleElements = $(this).find('.js-accord');
      accordeonsSingleElements.each(function () { 
        initAccordElement($(this), accordeonsSingleElements);
      });
    });
  };

/**
 * @param {jqSelectorElement} accordeonElement - main element. Click event
 * @param {jqSelectorElements} relatedAccordeonElements - related elements. Will be closed on main element click
 */
  function initAccordElement(accordeonElement, relatedAccordeonElements) {
    const _thisElement = accordeonElement;
    const _thisElementButton = accordeonElement.find('.js-accord-head');
    const _thisElementContent = accordeonElement.find('.js-accord-content');
    const _thisElementBody = accordeonElement.find('.js-accord-body');

    _thisElementButton.on('click', e => {
      e.preventDefault();
      toggleElement();
    });


    function toggleElement() {
      // checks class
      if (!_thisElement.hasClass('--js-accord_open')) {
        openElement();
        return;
      };
      // class is opened
      closeElement();
    };

    function closeElement() {
      _thisElement.removeClass('--js-accord_open');
      if (_thisElementContent.length > 0) {
        _thisElementBody.height(0);
      };
    };

    function openElement() {
      if (relatedAccordeonElements) {
        relatedAccordeonElements.removeClass('--js-accord_open');
        relatedAccordeonElements.find('.js-accord-body').height(0);
      };
      _thisElement.addClass('--js-accord_open');
      if (_thisElementContent.length > 0) {
        let itemBodyHeight = _thisElementContent.height();
        _thisElementBody.height(itemBodyHeight);
      };
    };



    // Update starting state
    if(_thisElement.hasClass('--js-accord_open')) {
      _thisElementBody.height(_thisElementContent.height());
    } else {
      _thisElementBody.height(0)
    };
    // Window resize recalculate
    window.addEventListener('resize', function() {
      if(_thisElement.hasClass('--js-accord_open')) {
        _thisElementBody.height(_thisElementContent.height());
      };
    }, { passive: true })
  };
  initAccordAll();
};
accordeonBaseFunction();