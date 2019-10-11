export const items = [
    {
        trigger: 'integral',
        code: () => document.execCommand('insertHTML', null, '&int;'),
    },
    {
        trigger: 'forall',
        code: () => document.execCommand('insertHTML', null, '&#8704;'),
    },
    {
        trigger: 'complement',
        code: () => document.execCommand('insertHTML', null, '&#8705;'),
    },
    {
        trigger: 'part_diff',
        code: () => document.execCommand('insertHTML', null, '&#8706;'),
    },

    {
        trigger: 'exists',
        code: () => document.execCommand('insertHTML', null, '&#8707;'),
    },

    {
        trigger: '!exists',
        code: () => document.execCommand('insertHTML', null, '&#8708;'),
    },

    {
        trigger: 'nabla',
        code: () => document.execCommand('insertHTML', null, '&nabla;'),
    },

    {
        trigger: 'in',
        code: () => document.execCommand('insertHTML', null, '&isin;'),
    },

    {
        trigger: 'not_in',
        code: () => document.execCommand('insertHTML', null, '&notin;'),
    },

    {
        trigger: 'sum',
        code: () => document.execCommand('insertHTML', null, '&sum;'),
    },

    {
        trigger: 'minplus',
        code: () => document.execCommand('insertHTML', null, '&#8723;'),
    },

    {
        trigger: 'set_minus',
        code: () => document.execCommand('insertHTML', null, '&#8726;'),
    },

    {
        trigger: 'sqrt',
        code: () => document.execCommand('insertHTML', null, '&radic;'),
    },

    {
        trigger: 'infinity',
        code: () => document.execCommand('insertHTML', null, '&infin;'),
    },
    {
        trigger: 'eps',
        code: () => document.execCommand('insertHTML', null, '&#120576;'),
    },
];
