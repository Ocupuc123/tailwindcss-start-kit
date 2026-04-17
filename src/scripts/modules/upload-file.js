export const uploadFile = () => {
  const inputs = document.querySelectorAll('.field-file__input:not([disabled])');

  inputs.forEach(input => {
    const fieldFile = input.closest('.field-file');
    if (!fieldFile) return;

    const label = fieldFile.querySelector('.field-file__name-text');
    if (!label) return;

    const labelVal = label.innerHTML;
    let fileName = '';

    input.addEventListener('change', (evt) => {
      if (input.files && input.files.length > 1) {
        const multipleCaption = input.dataset.multipleCaption || '';
        fileName = multipleCaption.replace('{count}', input.files.length);
      } else if (input.files && input.files.length === 1) {
        fileName = input.files[0].name;
      } else {
        fileName = evt.target.value.split('\\').pop();
      }

      label.innerHTML = fileName || labelVal;
    });
  });
};
