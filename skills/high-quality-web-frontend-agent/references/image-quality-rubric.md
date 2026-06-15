# Image Quality And Generation Rubric

Score prominent imagery in its rendered composition. Interpret `fit` by mode: owner/content fit in Core, narrative/canon fit in ARG, and business/brand fit in Corporate.

## Hard Failures
Unknown rights; visibly insufficient resolution; unintended logos, watermarks, malformed text, anatomy, geometry, perspective, or compositing defects; contradiction of verified facts or canon; premature disclosure; unusable responsive crops; missing text alternatives; or failed foreground contrast.

## Weighted Score
| Category | Weight |
| --- | ---: |
| Owner and site specificity | 20 |
| Mode fit | 15 |
| Composition and hierarchy | 15 |
| Authenticity and credibility | 15 |
| Responsive crop resilience | 10 |
| Technical finish | 10 |
| Set continuity | 10 |
| Accessibility and operational fitness | 5 |

## Generation Decision
Generate when an uncorrectable hard failure exists, a required subject is absent, responsive compositions cannot be produced, or the baseline is below 70 with an image-dependent category at 2 or lower and an expected gain of at least 10 after non-generation alternatives are exhausted.

## Approval
A generated replacement needs no hard failure, at least 80/100, at least 4/5 for specificity, mode fit, composition, and authenticity, and normally an 8-point baseline improvement. Inspect desktop and mobile crops at rendered and full size; record source or prompt, method, rights, processing, variants, inspection, and rejection reasons.

Scores 70-79 remain `needs-revision`; lower scores are rejected. Give observable reasons for every score below 5.

